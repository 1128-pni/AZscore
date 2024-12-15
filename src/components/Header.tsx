import { FC } from 'react';

const Header: FC = () => {
  return (
    <header className="text-center mb-12 py-8">
      <h1 className="text-3xl font-semibold text-gray-900">
        Fetal Echocardiography Calculator
      </h1>
      <p className="mt-2 text-gray-600">
        Please enter parameters for calculation
      </p>
    </header>
  );
};

export default Header;