import React, { useState, useEffect } from 'react';

import ReactDOM from 'react-dom';
import { Spin } from 'antd';
import { getInsights } from '@antv/ava';
import { JSONView, TableView, StepBar } from 'antv-site-demo-rc';

const AutoInsight = () => {
  const [result, setResult] = useState({});
  const [data, setData] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);

  const getMyInsights = async () => {
    fetch('https://cdn.jsdelivr.net/npm/vega-datasets@2.2.0/data/gapminder.json')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setData(data);
          const insightResult = getInsights(data, {
            // 取前10个洞察
            // limit the result insights to only the top 20
            limit: 10,
            // 自定义指标字段
            // custom measures
            measures: [
              { fieldName: 'life_expect', method: 'MEAN' },
              { fieldName: 'pop', method: 'SUM' },
              { fieldName: 'fertility', method: 'MEAN' },
            ],
            // 自定义维度字段
            // custom dimensions
            dimensions: [{ fieldName: 'country' }, { fieldName: 'year' }],
          });
          setResult(insightResult);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    getMyInsights();
  }, []);

  const dataContent = <TableView data={data} />;

  const insightsContent = <JSONView json={result} rjvConfigs={{ collapsed: 2 }} />;

  const steps = [
    {
      title: 'Data',
      desc: 'Source data:',
      content: dataContent,
    },
    {
      title: 'Insights',
      desc: 'Insights extracted from data:',
      content: insightsContent,
    },
  ];
  

  return (
    <>
      <StepBar current={currentStep} onChange={setCurrentStep} steps={steps} />
      <p>{steps[currentStep].desc}</p>

      <div className="steps-content" style={{ height: 'calc(100% - 80px)' }}>
        <Spin spinning={loading}>{steps[currentStep].content}</Spin>
      </div>
    </>
  );
};

export default AutoInsight;
