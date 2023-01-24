import React from 'react';

const Input = (props) => {
    return (
        <div className="form-control w-full rounded-none">

            <label className="label">

                <span className="label-text">{props.label}</span>

            </label>

            <input
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                className= {props.class ? props.class : "input input-bordered w-full rounded-none"}
                required={props.required || false}
            />

            <label className="label">
                <span className="label-text-alt text-red-600">
                    {props.errorMessage}
                </span>

            </label>

        </div>
    );
};

export default Input;