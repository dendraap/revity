// import { View, Text } from 'react-native'
// import React from 'react'
// import { useQuery } from '@apollo/client';
// import { GET_ALL_USER } from '@/app/query/getAllUser'

// const GetAllUser = () => {
//     const { loading, error, data, refetch  } = useQuery(GET_ALL_USER);

//     if (loading) return <Text>Loading...</Text>;
//     if (error) return <Text>Error: {error.message}</Text>;
//     return (
//         <View>
//             <Text>Categories List from Database:</Text>
//             {data.users?.map((ctg) => (
//                 <View key={ctg.iduser}>
//                     <Text>{ctg.name}</Text>
//                 </View>
//             ))}
//         </View>
//     )
// }

// export default GetAllUser