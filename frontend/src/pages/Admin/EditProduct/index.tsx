import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './EditProduct.module.scss'; // Импорт файла стилей

const EditProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        quantity: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`https://dp-viganovsky.xn--80ahdri7a.site/api/product/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setProduct(data.product);
                } else {
                    const errorData = await response.json();
                    setError(errorData.message);
                }
            } catch (error) {
                setError('Error fetching product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`https://dp-viganovsky.xn--80ahdri7a.site/api/product/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(product)
            });

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/admin');
                }, 2000);
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (error) {
            setError('Error saving product');
        }
    };

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
    if (success) return <div className={styles.success}>Product successfully updated! Redirecting...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <form className={styles.form}>
                    <h1>Edit Product</h1>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleInputChange}
                            className={styles.inputField}
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleInputChange}
                            className={styles.inputField}
                        ></textarea>
                    </div>
                    <div>
                        <label>Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleInputChange}
                            className={styles.inputField}
                        />
                    </div>
                    <div>
                        <label>Quantity:</label>
                        <input
                            type="number"
                            name="quantity"
                            value={product.quantity}
                            onChange={handleInputChange}
                            className={styles.inputField}
                        />
                    </div>
                    <button type="button" onClick={handleSave} className={styles.button}>Save</button>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
