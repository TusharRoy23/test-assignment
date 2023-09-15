import React, { useState } from 'react';
import { gql, useMutation } from "@apollo/client";
import { Button, Col, Form, Input, InputNumber, Modal, Row } from "antd";
import { ADD_PRODUCT } from "../common/graphql/Mutations";

const { TextArea } = Input;

interface parentProps {
    onCreate: (value: boolean) => void;
}

interface FormValues {
    name: string;
    price: number;
    stock: number;
    description: string;
}

interface ProductCreateFormProps {
    open: boolean;
    onCreate: (formValues: FormValues) => void;
    onCancel: () => void;
}
// Modal Form for product creation
const ProductCreateForm: React.FC<ProductCreateFormProps> = ({
    open, onCreate, onCancel
}) => {
    const [form] = Form.useForm();
    return (
        <Modal
            open={open}
            title="Add a new product"
            okText="Create"
            cancelText="Cancel"
            onCancel={() => {
                form.resetFields();
                onCancel();
            }}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form form={form} layout='vertical'>
                <Row>
                    <Col span={24}>
                        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input Name!' }]}>
                            <Input></Input>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input Price!' }]}>
                            <InputNumber type='number' style={{ width: '90%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Stock" name="stock" rules={[{ required: true, message: 'Please input Stock!' }]}>
                            <InputNumber type='number' style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="Description" name="description">
                            <TextArea rows={4} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

export function CreateProduct(props: parentProps): JSX.Element {
    const [open, setOpen] = useState(false);
    const [addProduct, { data, loading, error }] = useMutation(gql`${ADD_PRODUCT}`);

    const onCreate = (values: any) => {
        addProduct({
            variables: {
                name: values.name,
                price: +values.price,
                stock: +values.stock,
                description: values.description
            }
        });
        setOpen(false);
        props.onCreate(true);
    };

    return (
        <>
            <Button
                type="primary"
                onClick={() => {
                    setOpen(true);
                }}
            >
                Create Product
            </Button>
            {/* Modal Box for create form */}
            <ProductCreateForm
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </>
    );
}

