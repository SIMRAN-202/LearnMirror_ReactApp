import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ label, to }) => {
  return (
    <Link
      to={to}
      className="rounded-2xl p-10 bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-md text-center"
    >
      <h2 className="text-2xl font-bold tracking-wide uppercase">{label}</h2>
    </Link>
  );
};

export default FeatureCard;
