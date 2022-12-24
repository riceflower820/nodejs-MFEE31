import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StockDetails = () => {
  const [error, setError] = useState(null);
  const { stockId } = useParams();

  const [data, setData] = useState([]);
  //用 [] component 第一次初始化的時候會跑一次
  useEffect(() => {
    async function getStocks() {
      let response = await axios.get(`http://localhost:3001/api/stocks/${stockId}`);
      setData(response.data);
    }
    getStocks();
  }, []);
 

  console.log('stockDetail', stockId);

  return (
    <div>
      {error && <div>{error}</div>}
      <ul>
        <li
          style={{
            display: 'inline-block',
            margin: '2px',
            // backgroundColor: page === i ? '#00d1b2' : '',
            // borderColor: page === i ? '#00d1b2' : '#dbdbdb',
            // color: page === i ? '#fff' : '#363636',
            borderWidth: '1px',
            width: '28px',
            height: '28px',
            borderRadius: '3px',
            textAlign: 'center',
          }}
        >
          1
        </li>
      </ul>
      目前在第 1 頁
      {data.map((detail, index) =>{
        return(
          //因為日期每天不一樣 所以拿date當key
          <div key={detail.date} className="bg-white bg-gray-50 p-6 rounded-lg shadow m-6">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">日期：{detail.date}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              成交金額：{detail.amount}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              成交股數： {detail.volume}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              開盤價：{detail.open_price}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              收盤價：{detail.close_price}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              漲跌價差：{detail.delta_price}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              最高價：{detail.high_price}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              最低價：{detail.low_price}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              成交筆數：{detail.transactions}
            </h2>
        </div>
        )
      })}
    </div>
  );
};

export default StockDetails;
