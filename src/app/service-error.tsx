import ErrorLayout from '@/components/errors/ErrorLayout';
import ErrorPage from '@/components/errors/ErrorPage';

const ServiceError = () => {
  return (
    <ErrorLayout>
      <ErrorPage
        code={'503'}
        title="Service temporarily unavailable"
        description="The server is currently unable to handle the request.
           Please try again in a few minutes."
      />
    </ErrorLayout>
  );
};

export default ServiceError;
