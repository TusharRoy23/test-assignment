import { useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import Table, { ColumnsType } from 'antd/es/table';
import { GET_PRODUCT_LIST } from "../common/graphql/Queries";
import { Popconfirm } from 'antd';
import { DELETE_PRODUCT } from "../common/graphql/Mutations";

interface ProductDataType {
    id: number;
    name: string;
    price: number;
    stock: number;
    description: string;
}

interface parentProps {
    refetchData: boolean;
}

export function ProductList(props: parentProps): JSX.Element {
    const { data, refetch } = useQuery(gql`${GET_PRODUCT_LIST}`);
    const productList: ProductDataType[] = data?.products?.length ? [...data.products.map((res: ProductDataType) => ({ ...res, key: res.id }))] : [];

    const [deleteProduct] = useMutation(gql`${DELETE_PRODUCT}`);
    const handleDelete = (record: ProductDataType) => {
        deleteProduct({
            variables: {
                id: record.id
            }
        }).then(() => {
            refetch(); // After the successfull deletion, re-call the graphql api
        })
    }

    const columns: ColumnsType<ProductDataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'X',
            render: (_, record) =>
                productList.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
        }
    ];
    /*
        Refetch it after the adding new product.
    */
    useEffect(() => {
        refetch();
    }, [props.refetchData, refetch]);
    return (
        <div>
            <Table columns={columns} dataSource={productList} />
        </div>
    );
}