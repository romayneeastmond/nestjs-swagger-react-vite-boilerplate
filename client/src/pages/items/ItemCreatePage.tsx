import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { itemsService } from '../../services/items.service';
import { type CreateItemDto } from '../../types/item.types';
import usePageTitle from '../../hooks/usePageTitle';
import ItemForm from '../../components/items/ItemForm';

const ItemCreatePage = () => {
	usePageTitle('Create Item');
	const navigate = useNavigate();

	const [form, setForm] = useState<CreateItemDto>({
		name: '',
		description: '',
		price: undefined,
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: name === 'price' ? (value === '' ? undefined : parseFloat(value)) : value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		try {
			const created = await itemsService.create(form);
			navigate(`/items/${created.id}`);
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : 'Failed to create item');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h1>Create Item</h1>
			<ItemForm
				form={form}
				loading={loading}
				error={error}
				submitLabel="Create Item"
				onChange={handleChange}
				onSubmit={handleSubmit}
				onCancel={() => navigate('/items')}
			/>
		</div>
	);
};

export default ItemCreatePage;