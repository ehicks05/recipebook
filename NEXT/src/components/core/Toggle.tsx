interface Props {
	id: string;
	disabled?: boolean;
	checked: boolean;
	onChange: () => void;
	label: string;
}

const Toggle = ({ id, disabled, checked, onChange, label }: Props) => {
	return (
		<label htmlFor={id} className="relative inline-flex cursor-pointer items-center">
			<input
				id={id}
				disabled={disabled}
				type="checkbox"
				className="accent-amber-400"
				checked={checked}
				onChange={() => onChange()}
			/>
			<span
				className={`ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 ${
					disabled ? 'text-gray-500 dark:text-gray-600' : ''
				}`}
			>
				{label}
			</span>
		</label>
	);
};

export default Toggle;
