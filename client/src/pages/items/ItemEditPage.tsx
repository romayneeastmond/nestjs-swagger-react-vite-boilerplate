import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { itemsService } from '../../services/items.service';
import { type UpdateItemDto, type Item } from '../../types/item.types';
import usePageTitle from '../../hooks/usePageTitle';
import ItemForm from '../../components/items/ItemForm';

const ItemEditPage = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const [item, setItem] = useState<Item | null>(null);
	const [form, setForm] = useState<UpdateItemDto>({
		name: '',
		description: '',
		price: undefined,
	});
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);

	usePageTitle(item ? `Edit ${item.name}` : 'Edit Item');

	useEffect(() => {
		const fetchItem = async () => {
			try {
				const data = await itemsService.getOne(id!);
				setItem(data);
				setForm({
					name: data.name,
					description: data.description ?? '',
					price: data.price,
				});
			} catch (err: unknown) {
				setError(err instanceof Error ? err.message : 'Failed to fetch item');
			} finally {
				setLoading(false);
			}
		};

		fetchItem();
	}, [id]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: name === 'price' ? (value === '' ? undefined : parseFloat(value)) : value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSaving(true);
		setError(null);
		try {
			await itemsService.update(id!, form);
			navigate(`/items/${id}`);
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : 'Failed to update item');
		} finally {
			setSaving(false);
		}
	};

	if (loading) return <p>Loading...</p>;
	if (!item) return <p>Item not found.</p>;

	return (
		<div>
			<h1>Edit {item.name}</h1>
			<ItemForm
				form={form}
				loading={saving}
				error={error}
				submitLabel="Save Changes"
				onChange={handleChange}
				onSubmit={handleSubmit}
				onCancel={() => navigate(`/items/${id}`)}
			/>
		</div>
	);
};

export default ItemEditPage;