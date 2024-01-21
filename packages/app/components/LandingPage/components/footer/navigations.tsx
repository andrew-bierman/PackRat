import React from 'react';
import SocialMedia from './social-media';

function FooterNavigations() {
  return (
    <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
      <div className="space-y-3">
        <h3 className="tracki uppercase ">Product</h3>
        <ul className="space-y-1">
          <li>
            <a rel="noopener noreferrer" href="#">
              Features
            </a>
          </li>
          <li>
            <a rel="noopener noreferrer" href="#">
              Integrations
            </a>
          </li>
          <li>
            <a rel="noopener noreferrer" href="#">
              Pricing
            </a>
          </li>
          <li>
            <a rel="noopener noreferrer" href="#">
              FAQ
            </a>
          </li>
        </ul>
      </div>
      <div className="space-y-3">
        <h3 className="tracki uppercase ">Company</h3>
        <ul className="space-y-1">
          <li>
            <a rel="noopener noreferrer" href="#">
              Privacy
            </a>
          </li>
          <li>
            <a rel="noopener noreferrer" href="#">
              Terms of Service
            </a>
          </li>
        </ul>
      </div>
      <div className="space-y-3">
        <h3 className="uppercase ">Developers</h3>
        <ul className="space-y-1">
          <li>
            <a rel="noopener noreferrer" href="#">
              Public API
            </a>
          </li>
          <li>
            <a rel="noopener noreferrer" href="#">
              Documentation
            </a>
          </li>
          <li>
            <a rel="noopener noreferrer" href="#">
              Guides
            </a>
          </li>
        </ul>
      </div>
      <SocialMedia />
    </div>
  );
}

export default FooterNavigations;
