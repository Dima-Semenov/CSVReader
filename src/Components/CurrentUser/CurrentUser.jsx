import React, { useState, useEffect } from 'react';
import '../CurrentUser/currentUser.scss';
import PropTypes from 'prop-types';

export const CurrentUser = ({
  id,
  full_name,
  phone,
  email,
  age,
  experience,
  yearly_income,
  has_children,
  license_states,
  expiration_date,
  license_number,
  dublicate,
}) => {
  const million = 1000000;
  const [ isAgeError, setIsAgeError] = useState(true);
  const [ isExperienceError, setIsExperienceError] = useState(true);
  const [ isIncomeError, setIsIncomeError ] = useState(true);
  const [ isChildrenError, setIsChildrenError ] = useState(true);
  const [ correctChildren, setCorrectChildren ] = useState(null);
  const [ isPhoneError, setIsPhoneError ] = useState(true);
  const [ isLicenseError, setIsLicenseError ] = useState(true);
  const [ isDateError, setIsDateError ] = useState(true);
  const [ isStatesError, setIsStatesError ] = useState(true);
  const [ isEmailError, setIsEmailError ] = useState(true);

  useEffect(() => {
    const date = new Date();

    if (typeof(age) === "number" && age >= 21 && age !== 0) {
      setIsAgeError(false);
    }

    if (
        experience >= 0 &&
        experience <= age &&
        typeof(experience) === "number"
       ) {
      setIsExperienceError(false);
    }

    if (typeof(yearly_income) === "number" && yearly_income <= million ) {
      if (String(yearly_income).includes(".")) {
        if(String(yearly_income).split('.')[1].length === 2)
        setIsIncomeError(false);
      }
    }

    if ( typeof(has_children) === "boolean" ) {
      if ( has_children ) {
        setCorrectChildren("True");
      } else {
        setCorrectChildren("False");
      }

      setIsChildrenError(false);
    } else {
      setCorrectChildren(has_children);
    }

    if (String(license_number).trim().length === 6) {
      setIsLicenseError(false);
    }

    if (phone[0] === '+' && phone[1] === '1' && phone.length === 12) {
      setIsPhoneError(false);
    }

    if (Date.parse(date)/1000 > Date.parse(expiration_date)/1000) {
      setIsDateError(false);
    }

    if (typeof(license_states) === 'string' ) {
      if (license_states.trim().length !== 0) {
        setIsStatesError(false);
      }
    }

    if (email.includes("@")) {
      setIsEmailError(false);
    }

  },
  [
    age,
    experience,
    yearly_income,
    has_children,
    license_number,
    phone,expiration_date,
    license_states,
    email
  ])

  return (
    <tr>
      <td>{id}</td>
      <td>{full_name}</td>
      <td className={isPhoneError ? "mistake" : ''}>
        {phone}
      </td>
      <td className={isEmailError ? "mistake" : ''}>
        {email}
      </td>
      <td className={isAgeError ? "mistake" : ''}>
        {age}
      </td>
      <td className={isExperienceError ? "mistake" : ''}>
        {experience}
      </td>
      <td className={isIncomeError ? "mistake" : ''}>
        {yearly_income}
      </td>
      <td className={isChildrenError ? "mistake" : ''}>
        {correctChildren}
      </td>
      <td className={isStatesError ? "mistake" : ''}>
        {license_states}
      </td>
      <td className={isDateError ? "mistake" : ''}>
        {expiration_date}
      </td>
      <td className={isLicenseError ? "mistake" : ''}>
        {license_number}
      </td>
      <td>
        {dublicate}
      </td>
    </tr>
  );
};

CurrentUser.propTypes = {
  id: PropTypes.number.isRequired,
  full_name: PropTypes.string.isRequired,
  phone: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};

CurrentUser.defaultProps = {
  age: null,
  experience: '',
  yearly_income: '',
  has_children: false,
  license_states: '',
  expiration_date: null,
  license_number: '',
  dublicate: null,
}