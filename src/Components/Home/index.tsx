// packaged imports

import React, { useEffect, useState } from 'react';
import { Button, Select, message, Form, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

// un packaged imports
import Table from '../Table';
import DirectedGraph from '../../helper/get-shortest-path';
import { Nodes, Graph } from '../../helper/db';

const { Option } = Select;
const { Title } = Typography;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

function HomeComponent() {
  const [graph, setGraph] = useState<any>(null);
  const [shortestPath, setShortestPath] = useState<any>([]);
  const [possiblePaths, setPossiblePaths] = useState<any>([]);
  const [exactPath, setExactPath] = useState<any>([]);

  useEffect(() => {
    const graph = new DirectedGraph();
    Nodes.map((id) => graph.addNode(id));
    Graph.map(({ source, target, weight }) => graph.addLink(source, target, weight));

    setGraph(graph);
  }, []);

  /**
   * function used to calculate all path of the given points
   * @param values
   */
  const getCost = (values: any) => {
    if (values.length < 2) {
      return message.error('Please select Pickup and Drop off');
    }
    const { points } = values;

    const allPaths: any = graph.shortestPath(points[0], points[points.length - 1]);

    const exactPathInd: number = allPaths.map((ap: any, indx: number): number => {
      if (areArrayEqual(ap.path, points)) {
        return indx;
      } else {
        return -1;
      }
    })[0];

    const sortedPaths: any[] = allPaths
      .filter((r: any) => r.path[r.path.length - 1] === points[points.length - 1])
      .sort((a: any, b: any) => a.weight - b.weight);

    let exactPath: any = allPaths[exactPathInd];

    let shortestPaths: any = sortedPaths[0];

    let possiblePaths: any = sortedPaths;

    exactPath = parseTableData(exactPath ? [exactPath] : [{ path: points, weight: -1 }]);
    shortestPaths = parseTableData(
      shortestPaths ? [shortestPaths] : [{ path: points, weight: -1 }],
    );
    possiblePaths = parseTableData(possiblePaths ? possiblePaths : [{ path: points, weight: -1 }]);

    setShortestPath(shortestPaths);
    setPossiblePaths(possiblePaths);
    setExactPath(exactPath);
  };

  /**
   * function used for comparing two arrays
   * @param a1 Array
   * @param a2 Array
   */
  const areArrayEqual = (a1: [], a2: []) => {
    return JSON.stringify(a1) === JSON.stringify(a2);
  };

  /**
   * function used to parse the data to readable format for showing table
   * @param arr
   */
  const parseTableData = (arr: any): any => {
    const tempArr: any = [];
    arr.map((a: any): any => {
      if (a.weight < 0) {
        tempArr.push({
          description: `Route ${a.path.join('-')}`,
          cost: 'Route does not exist',
        });
        return;
      }
      const description = `Route ${a.path.join('-')} will cost you`;
      const cost = a.weight;
      tempArr.push({ description, cost });
      return;
    });
    return tempArr;
  };

  return (
    <>
      <Form
        style={{ marginTop: '1%' }}
        name='dynamic_form_item'
        {...formItemLayoutWithOutLabel}
        onFinish={getCost}
      >
        <Form.List
          name='points'
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length < 2) {
                  return Promise.reject(new Error('At least 2 points'));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? 'Points' : ''}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    className='w-100 center'
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        message: 'Please add point or delete this field',
                      },
                    ]}
                    noStyle
                  >
                    <Select style={{ width: '60%' }}>
                      {Nodes.map((n: string) => (
                        <Option key={n} value={n}>
                          Point {n}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className='dynamic-delete-button'
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type='dashed'
                  onClick={() => add()}
                  style={{ width: '60%' }}
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Find Cost
          </Button>
        </Form.Item>
      </Form>
      <Title>Shortest Path for the given Points</Title>
      <Table entries={shortestPath} />
      <Title>Possible Paths for the given Points</Title>
      <Table entries={possiblePaths} />
      <Title>Exact Path for the given Points</Title>
      <Table entries={exactPath} />
    </>
  );
}

export default HomeComponent;
