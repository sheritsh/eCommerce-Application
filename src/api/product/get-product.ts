// import Endpoints from '../endpoints';
// import { register } from '../auth';

// const getProduct = async () => {
//   try {
//     const id = '1ffa9ba4-c4b0-4fee-8c59-6873ec2b01e6';
//     const url = `${Endpoints.GET_PRODUCTS}/${id}`;
//     const token = await register();
//     const response = await fetch(url, {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token.access_token}`,
//       },
//     });
//     const data = await response.json();
//     return data;
//   } catch (err) {
//     console.error(err);
//   }
// };

// const data = getProduct();

// export default data;
