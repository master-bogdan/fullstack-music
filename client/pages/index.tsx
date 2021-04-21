import MainLayout from 'layouts/MainLayout';

const Index = () => {
  return (
    <>
      <MainLayout>
        <div className="center">
          <h1>Welcome to music app</h1>
          <h3>Here you can find best music</h3>
        </div>
      </MainLayout>

      <style jsx>
          {`
            .center {
              margin-top: 150px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }
          `}
        </style>
    </>
  );
};

export default Index;
