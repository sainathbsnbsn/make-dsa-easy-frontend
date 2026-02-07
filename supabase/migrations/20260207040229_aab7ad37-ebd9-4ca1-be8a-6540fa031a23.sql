
-- Allow any authenticated user to insert problems
CREATE POLICY "Authenticated users can insert problems"
ON public.problems
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Allow any authenticated user to insert problem examples
CREATE POLICY "Authenticated users can insert problem_examples"
ON public.problem_examples
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Allow any authenticated user to insert problem hints
CREATE POLICY "Authenticated users can insert problem_hints"
ON public.problem_hints
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Allow any authenticated user to insert problem solutions
CREATE POLICY "Authenticated users can insert problem_solutions"
ON public.problem_solutions
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Allow any authenticated user to insert problem tags
CREATE POLICY "Authenticated users can insert problem_tags"
ON public.problem_tags
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Allow any authenticated user to insert problem patterns
CREATE POLICY "Authenticated users can insert problem_patterns"
ON public.problem_patterns
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Allow any authenticated user to insert problem companies
CREATE POLICY "Authenticated users can insert problem_companies"
ON public.problem_companies
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);
