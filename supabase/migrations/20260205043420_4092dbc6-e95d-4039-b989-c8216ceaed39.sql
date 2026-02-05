-- Create enum types
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
CREATE TYPE public.difficulty_level AS ENUM ('easy', 'medium', 'hard');

-- Create user_roles table for role-based access
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create patterns table
CREATE TABLE public.patterns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create companies table
CREATE TABLE public.companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create problems table
CREATE TABLE public.problems (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    difficulty difficulty_level NOT NULL DEFAULT 'medium',
    problem_statement TEXT NOT NULL,
    constraints TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create problem_tags table (many-to-many for tags)
CREATE TABLE public.problem_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    problem_id UUID REFERENCES public.problems(id) ON DELETE CASCADE NOT NULL,
    tag TEXT NOT NULL,
    UNIQUE (problem_id, tag)
);

-- Create problem_patterns junction table
CREATE TABLE public.problem_patterns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    problem_id UUID REFERENCES public.problems(id) ON DELETE CASCADE NOT NULL,
    pattern_id UUID REFERENCES public.patterns(id) ON DELETE CASCADE NOT NULL,
    UNIQUE (problem_id, pattern_id)
);

-- Create problem_companies junction table
CREATE TABLE public.problem_companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    problem_id UUID REFERENCES public.problems(id) ON DELETE CASCADE NOT NULL,
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE NOT NULL,
    UNIQUE (problem_id, company_id)
);

-- Create examples table
CREATE TABLE public.problem_examples (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    problem_id UUID REFERENCES public.problems(id) ON DELETE CASCADE NOT NULL,
    input TEXT NOT NULL,
    output TEXT NOT NULL,
    explanation TEXT,
    order_index INTEGER NOT NULL DEFAULT 0
);

-- Create hints table
CREATE TABLE public.problem_hints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    problem_id UUID REFERENCES public.problems(id) ON DELETE CASCADE NOT NULL,
    hint_text TEXT NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 0
);

-- Create solutions table (brute, better, best)
CREATE TABLE public.problem_solutions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    problem_id UUID REFERENCES public.problems(id) ON DELETE CASCADE NOT NULL,
    approach_level TEXT NOT NULL CHECK (approach_level IN ('Good', 'Better', 'Best')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    time_complexity TEXT NOT NULL,
    space_complexity TEXT NOT NULL,
    java_code TEXT,
    cpp_code TEXT,
    python_code TEXT,
    order_index INTEGER NOT NULL DEFAULT 0
);

-- Enable RLS on all tables
ALTER TABLE public.patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problem_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problem_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problem_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problem_examples ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problem_hints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problem_solutions ENABLE ROW LEVEL SECURITY;

-- Public read policies (everyone can view problems)
CREATE POLICY "Anyone can view patterns" ON public.patterns FOR SELECT USING (true);
CREATE POLICY "Anyone can view companies" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Anyone can view problems" ON public.problems FOR SELECT USING (true);
CREATE POLICY "Anyone can view problem_tags" ON public.problem_tags FOR SELECT USING (true);
CREATE POLICY "Anyone can view problem_patterns" ON public.problem_patterns FOR SELECT USING (true);
CREATE POLICY "Anyone can view problem_companies" ON public.problem_companies FOR SELECT USING (true);
CREATE POLICY "Anyone can view problem_examples" ON public.problem_examples FOR SELECT USING (true);
CREATE POLICY "Anyone can view problem_hints" ON public.problem_hints FOR SELECT USING (true);
CREATE POLICY "Anyone can view problem_solutions" ON public.problem_solutions FOR SELECT USING (true);

-- Admin write policies
CREATE POLICY "Admins can manage patterns" ON public.patterns FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage companies" ON public.companies FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage problems" ON public.problems FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage problem_tags" ON public.problem_tags FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage problem_patterns" ON public.problem_patterns FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage problem_companies" ON public.problem_companies FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage problem_examples" ON public.problem_examples FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage problem_hints" ON public.problem_hints FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage problem_solutions" ON public.problem_solutions FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add trigger to problems table
CREATE TRIGGER update_problems_updated_at
BEFORE UPDATE ON public.problems
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some default patterns
INSERT INTO public.patterns (name, slug, description, icon) VALUES
('Arrays & Hashing', 'arrays-hashing', 'Problems involving array manipulation and hash tables', 'Hash'),
('Two Pointers', 'two-pointers', 'Problems using two pointer technique', 'ArrowLeftRight'),
('Sliding Window', 'sliding-window', 'Problems involving sliding window patterns', 'Layers'),
('Stack', 'stack', 'Problems using stack data structure', 'Layers'),
('Binary Search', 'binary-search', 'Problems using binary search algorithm', 'Search'),
('Linked List', 'linked-list', 'Problems involving linked lists', 'Link'),
('Trees', 'trees', 'Problems involving tree data structures', 'Network'),
('Tries', 'tries', 'Problems involving trie data structure', 'GitBranch'),
('Heap / Priority Queue', 'heap-priority-queue', 'Problems using heaps', 'BarChart'),
('Backtracking', 'backtracking', 'Problems using backtracking', 'Undo'),
('Graphs', 'graphs', 'Problems involving graph algorithms', 'Share2'),
('Dynamic Programming', 'dynamic-programming', 'Problems using DP', 'Sparkles'),
('Greedy', 'greedy', 'Problems using greedy algorithms', 'Zap'),
('Intervals', 'intervals', 'Problems involving intervals', 'Calendar'),
('Math & Geometry', 'math-geometry', 'Math and geometry problems', 'Calculator'),
('Bit Manipulation', 'bit-manipulation', 'Problems using bit operations', 'Binary');

-- Insert some default companies
INSERT INTO public.companies (name, slug) VALUES
('Google', 'google'),
('Amazon', 'amazon'),
('Microsoft', 'microsoft'),
('Meta', 'meta'),
('Apple', 'apple'),
('Netflix', 'netflix'),
('Bloomberg', 'bloomberg'),
('Uber', 'uber'),
('LinkedIn', 'linkedin'),
('Adobe', 'adobe');