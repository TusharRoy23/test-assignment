import { gql, useQuery } from '@apollo/client';
import { Typography } from 'antd';
import { useEffect } from 'react';
import { GET_TOTAL_PRICE } from "../common/graphql/Queries";

const { Title } = Typography;
export function ProductPrice(props: { refetchData: boolean; }): JSX.Element {
    const { data, refetch } = useQuery(gql`${GET_TOTAL_PRICE}`);
    useEffect(() => {
        refetch();
    }, [props.refetchData, refetch])
    return (
        <>
            <Title level={4}>Total Value: {data?.products_aggregate?.aggregate?.sum?.price}</Title>
        </>
    );
}