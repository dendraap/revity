// import { View, Text } from 'react-native'
// import React from 'react'
// import { useQuery } from '@apollo/client'
// import { GET_DEFAULT_CATEGORIES } from '@/app/query/defaultCategories'


// const GetAllCategories = () => {
//     const { loading, error, data } = useQuery(GET_DEFAULT_CATEGORIES);
//     if (loading) return <Text>Loading...</Text>;
//     if (error) return <Text>Error: {error.message}</Text>;
//     console.log(data);
//     return (
//         <View>
//             <Text>Categories List from Database:</Text>
//             {data.categories?.map((ctg) => (
//                 <View key={ctg.iduser}>
//                     <Text>{ctg.name}</Text>
//                 </View>
//             ))}
//         </View>
//     )
// }

// export default GetAllCategories