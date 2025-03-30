export const InputField = ({
    label,
    type,
    name,
    value,
    onChange,
    required,
    rows
}) => {
    return (
        <div className="
        flex
        flex-col
        pt-2
        gap-1
        ">
            <label> {label} </label>
            {type === "textarea" ? (
                <textarea
                    rows={rows}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                />
            )}
        </div>
    )
}
