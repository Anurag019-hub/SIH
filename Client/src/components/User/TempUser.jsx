import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

// --- SVG Flag Components for better readability ---

const IndiaFlag = () => (
    <svg className="h-4 w-4 me-2" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_1_2)">
        <rect width="21" height="15" rx="2" fill="white"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M0 5H21V0H0V5Z" fill="#FF9933"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M0 15H21V10H0V15Z" fill="#138808"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M10.5 9.5C11.8807 9.5 13 8.38071 13 7C13 5.61929 11.8807 4.5 10.5 4.5C9.11929 4.5 8 5.61929 8 7C8 8.38071 9.11929 9.5 10.5 9.5Z" fill="#000080"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M10.5 8.75C11.4665 8.75 12.25 7.9665 12.25 7C12.25 6.0335 11.4665 5.25 10.5 5.25C9.5335 5.25 8.75 6.0335 8.75 7C8.75 7.9665 9.5335 8.75 10.5 8.75Z" fill="white"/>
        </g>
        <defs>
        <clipPath id="clip0_1_2">
        <rect width="21" height="15" rx="2" fill="white"/>
        </clipPath>
        </defs>
    </svg>
);
// --- Main App Component ---

const TempUser = ({page}) => {
    // Data for the dropdown
    const countries = [
        { name: 'India', code: '+91', flag: <IndiaFlag /> }
    ];

    // Component State
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle selecting a country
    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setIsDropdownOpen(false);
    };
    
    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Simple validation
        if (phoneNumber.trim() === '') {
            alert('Please enter a phone number.');
            return;
        }
        if(phoneNumber.length != 10){
            alert('Please enter a valid phone number.');
            return;
        }
        console.log(`Sending verification code to ${selectedCountry.code}${phoneNumber}`);
        // Here you would typically call an API to send the verification code
        toast(`Verification code sent to ${selectedCountry.code} ${phoneNumber}`);
    };

    return (
        // Main container
        <div className='flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 font-sans'>
            {/* Login Box */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-sm">
                <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{page}</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Enter your phone number to continue.</p>
                </div>
                
                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative" ref={dropdownRef}>
                        <label htmlFor="phone-input" className="sr-only">Phone number:</label>
                        <div className="flex items-center">
                            {/* Country Selector Button */}
                            <button
                                id="dropdown-phone-button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 transition-colors"
                                type="button"
                            >
                                {selectedCountry.flag}
                                {selectedCountry.code}
                                <svg className={`w-2.5 h-2.5 ms-2.5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div id="dropdown-phone" className="absolute top-full mt-2 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-52 dark:bg-gray-700 animate-fade-in">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-phone-button">
                                        {countries.map((country) => (
                                            <li key={country.code}>
                                                <button
                                                    type="button"
                                                    onClick={() => handleCountrySelect(country)}
                                                    className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    role="menuitem"
                                                >
                                                    <span className="inline-flex items-center">
                                                        {country.flag}
                                                        {country.name} ({country.code})
                                                    </span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            
                            {/* Phone Input */}
                            <div className="relative w-full">
                                <input
                                    type="tel"
                                    id="phone-input"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="block p-2.5 w-full z-0 text-sm text-gray-900 bg-gray-50 rounded-e-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 transition-colors"
                                    placeholder="123-456-7890"
                                    required
                                    maxLength={10}
                                    minLength={10}
                                    pattern="[0-9]{10}"
                                />
                            </div>
                        </div>
                    </div>
                    
                    <p id="helper-text-explanation" className="text-xs text-center text-gray-500 dark:text-gray-400">
                        We will send you an SMS with a verification code.
                    </p>
                    
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition-all duration-300 transform hover:scale-105"
                    >
                        Send Verification Code
                    </button>
                </form>
            </div>
             
        </div>
    );
}

export default TempUser;
