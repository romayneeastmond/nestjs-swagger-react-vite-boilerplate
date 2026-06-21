import { type CreateItemDto, type UpdateItemDto } from '../../types/item.types';

interface ItemFormProps {
	form: CreateItemDto | UpdateItemDto;
	loading: boolean;
	error: string | null;
	submitLabel: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.FormEvent) => void;
	onCancel: () => void;
}

const ItemForm = ({ form, loading, error, submitLabel, onChange, onSubmit, onCancel }: ItemFormProps) => {
	return (
		<div>
			{error && <p>Error: {error}</p>}
			<form onSubmit={onSubmit}>
				<div>
					<label htmlFor="name">Name *</label>
					<input
						id="name"
						name="name"
						type="text"
						value={form.name}
						onChange={onChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="description">Description</label>
					<input
						id="description"
						name="description"
						type="text"
						value={form.description ?? ''}
						onChange={onChange}
					/>
				</div>
				<div>
					<label htmlFor="price">Price</label>
					<input
						id="price"
						name="price"
						type="number"
						step="0.01"
						value={form.price ?? ''}
						onChange={onChange}
					/>
				</div>
				<div>
					<button type="submit" disabled={loading}>
						{loading ? 'Please wait...' : submitLabel}
					</button>
					<button type="button" onClick={onCancel}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default ItemForm;