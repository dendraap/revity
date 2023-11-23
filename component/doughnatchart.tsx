import { View } from 'react-native';
import Colors from '../../revity/constants/Colors';
import { PieChart } from 'react-native-gifted-charts';

const HomeDoughnutChart = () => {
  const pieData = [
    {value: 30, color: Colors.success, text: '30%'},
    {value: 10, color: Colors.orange, text: '10%'},
    {value: 50, color: Colors.primary, text: '50%'},
  ];

  return(
    <View style={{margin: 20, alignItems: 'center'}}>
      <PieChart
        donut
        innerRadius={50}
        radius={110}
        showText
        textColor="white"
        textSize={14}
        labelsPosition='outward'
        data={pieData}
      />
    </View>
  );
};

export default HomeDoughnutChart;
