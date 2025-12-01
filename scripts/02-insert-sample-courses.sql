-- Insert free course data from various platforms
INSERT INTO public.course_integrations (course_provider, course_id, course_title, course_description, course_url, course_level, duration_hours, is_free, skills_covered, thumbnail_url)
VALUES
  ('Coursera', 'coursera-1', 'React Basics', 'Learn React fundamentals with real-world projects', 'https://www.coursera.org/learn/react', 'Beginner', 30, TRUE, ARRAY['React', 'JavaScript', 'Web Development'], '/placeholder.svg?height=200&width=300&text=React+Basics'),
  ('edX', 'edx-1', 'Python for Data Science', 'Master Python programming for data analysis and machine learning', 'https://www.edx.org/course/python-data-science', 'Intermediate', 40, TRUE, ARRAY['Python', 'Data Science', 'Machine Learning'], '/placeholder.svg?height=200&width=300&text=Python+Data+Science'),
  ('Udemy', 'udemy-1', 'Full-Stack Web Development', 'Complete guide to building modern web applications', 'https://www.udemy.com/course/fullstack', 'Intermediate', 50, TRUE, ARRAY['JavaScript', 'Node.js', 'React', 'MongoDB'], '/placeholder.svg?height=200&width=300&text=Full+Stack+Dev'),
  ('freeCodeCamp', 'fcc-1', 'UI/UX Design Fundamentals', 'Master modern design principles and tools like Figma', 'https://www.freecodecamp.org/ux-design', 'Beginner', 35, TRUE, ARRAY['UI Design', 'UX Design', 'Figma', 'Design Thinking'], '/placeholder.svg?height=200&width=300&text=UI+UX+Design'),
  ('Coursera', 'coursera-2', 'Product Management Specialization', 'Become a product manager with industry insights', 'https://www.coursera.org/specializations/product-management', 'Advanced', 60, TRUE, ARRAY['Product Management', 'Leadership', 'Strategy', 'Analytics'], '/placeholder.svg?height=200&width=300&text=Product+Mgmt'),
  ('MIT OpenCourseWare', 'mit-1', 'Introduction to Computer Science', 'Foundational CS concepts from MIT', 'https://ocw.mit.edu/courses/intro-cs', 'Beginner', 45, TRUE, ARRAY['Computer Science', 'Algorithms', 'Programming'], '/placeholder.svg?height=200&width=300&text=MIT+CS+101'),
  ('LinkedIn Learning', 'linkedin-1', 'Advanced TypeScript', 'Master advanced TypeScript patterns and techniques', 'https://www.linkedin.com/learning/advanced-typescript', 'Advanced', 25, TRUE, ARRAY['TypeScript', 'JavaScript', 'Web Development'], '/placeholder.svg?height=200&width=300&text=TypeScript'),
  ('Khan Academy', 'khan-1', 'Statistics and Probability', 'Comprehensive statistics course for data professionals', 'https://www.khanacademy.org/math/statistics', 'Intermediate', 30, TRUE, ARRAY['Statistics', 'Probability', 'Data Analysis'], '/placeholder.svg?height=200&width=300&text=Statistics');

-- Verify inserts
SELECT COUNT(*) as total_courses FROM public.course_integrations;
