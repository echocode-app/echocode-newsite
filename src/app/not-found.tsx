import ErrorLayout from '@/components/errors/ErrorLayout';
import ErrorPage from '@/components/errors/ErrorPage';

const NotFound = () => {
  return (
    <ErrorLayout>
      <ErrorPage
        code={'404'}
        title="Page Not Found"
        description="Your search has ventured beyond the known universe."
      />
    </ErrorLayout>
  );
};

export default NotFound;
