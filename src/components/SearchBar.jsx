import React from "react";

const SearchBar = ({ getState, inputHandler, submitHandler }) =>
{
    return (
        <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
            <div className="col-auto">
                <label htmlFor="location-name" className="col-form-label">
                    Enter Location :
                </label>
            </div>
            <div className="col-auto">
                <input
                    type="text"
                    id="location-name"
                    className="form-control"
                    onChange={inputHandler}
                    value={getState}
                />
            </div>
            <button className="btn btn-primary mt-2" onClick={submitHandler}>
                Search
            </button>
        </div>
    );
};

export default SearchBar;
