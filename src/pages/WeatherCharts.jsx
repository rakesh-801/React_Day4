import React, { useState, useEffect } from 'react';
import { 
  Box, Heading, Select, Stack, HStack, 
  VStack, Text, Button, useColorModeValue,
  Card, CardHeader, CardBody, SimpleGrid
} from '@chakra-ui/react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';  // This is the correct import
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { getWeatherData } from '../services/weatherService';

const WeatherCharts = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState('line');
  const [selectedCity, setSelectedCity] = useState('all');
  const [timeRange, setTimeRange] = useState('weekly');
  const [stats, setStats] = useState(null);

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWeatherData();
        setWeatherData(data);
        calculateStats(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const calculateStats = (data) => {
    if (!data || data.length === 0) return;
    
    // Find hottest city
    const hottest = data.reduce((prev, current) => 
      (prev.temperature > current.temperature) ? prev : current
    );
    
    // Find coldest city
    const coldest = data.reduce((prev, current) => 
      (prev.temperature < current.temperature) ? prev : current
    );
    
    // Find windiest city
    const windiest = data.reduce((prev, current) => 
      (prev.wind > current.wind) ? prev : current
    );
    
    setStats({
      hottest: `${hottest.city} (${hottest.temperature}°C)`,
      coldest: `${coldest.city} (${coldest.temperature}°C)`,
      windiest: `${windiest.city} (${windiest.wind} km/h)`
    });
  };

  const processDataForCharts = () => {
    if (!weatherData || weatherData.length === 0) return [];
    
    // Filter by city if selected
    let filteredData = weatherData;
    if (selectedCity !== 'all') {
      filteredData = weatherData.filter(item => item.city === selectedCity);
    }
    
    // Group by week or show all data
    if (timeRange === 'weekly') {
      const weeklyData = {};
      filteredData.forEach(item => {
        const date = new Date(item.date);
        const weekNumber = getWeekNumber(date);
        const key = `${date.getFullYear()}-W${weekNumber}`;
        
        if (!weeklyData[key]) {
          weeklyData[key] = {
            week: key,
            temperature: 0,
            humidity: 0,
            wind: 0,
            count: 0
          };
        }
        
        weeklyData[key].temperature += item.temperature;
        weeklyData[key].humidity += item.humidity;
        weeklyData[key].wind += item.wind;
        weeklyData[key].count += 1;
      });
      
      // Calculate averages
      return Object.values(weeklyData).map(week => ({
        ...week,
        temperature: Math.round(week.temperature / week.count),
        humidity: Math.round(week.humidity / week.count),
        wind: Math.round(week.wind / week.count)
      }));
    }
    
    return filteredData.map(item => ({
      date: new Date(item.date).toLocaleDateString(),
      city: item.city,
      temperature: item.temperature,
      humidity: item.humidity,
      wind: item.wind
    }));
  };

  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const chartData = processDataForCharts();
  const cities = [...new Set(weatherData.map(item => item.city))];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={timeRange === 'weekly' ? 'week' : 'date'} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="#FF6347" 
                activeDot={{ r: 8 }} 
                name="Temperature (°C)"
              />
              <Line 
                type="monotone" 
                dataKey="humidity" 
                stroke="#1E90FF" 
                name="Humidity (%)"
              />
              <Line 
                type="monotone" 
                dataKey="wind" 
                stroke="#32CD32" 
                name="Wind Speed (km/h)"
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={timeRange === 'weekly' ? 'week' : 'date'} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="temperature" fill="#FF6347" name="Temperature (°C)" />
              <Bar dataKey="humidity" fill="#1E90FF" name="Humidity (%)" />
              <Bar dataKey="wind" fill="#32CD32" name="Wind Speed (km/h)" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="temperature"
                nameKey={timeRange === 'weekly' ? 'week' : 'date'}
                name="Temperature (°C)"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Box p={8} bg={bgColor} minH="100vh">
        <Text>Loading data...</Text>
      </Box>
    );
  }

  return (
    <Box p={8} bg={bgColor} minH="100vh">
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between">
          <Button 
            as={Link} 
            to="/" 
            leftIcon={<ArrowBackIcon />} 
            colorScheme="blue"
          >
            Back to Dashboard
          </Button>
          <Heading size="xl">Weather Data Visualization</Heading>
          <Box w="200px"></Box> {/* Spacer for alignment */}
        </HStack>

        {stats && (
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            <Card bg={cardBg}>
              <CardHeader>
                <Heading size="md">🔥 Hottest</Heading>
              </CardHeader>
              <CardBody>
                <Text fontSize="xl">{stats.hottest}</Text>
              </CardBody>
            </Card>
            <Card bg={cardBg}>
              <CardHeader>
                <Heading size="md">❄️ Coldest</Heading>
              </CardHeader>
              <CardBody>
                <Text fontSize="xl">{stats.coldest}</Text>
              </CardBody>
            </Card>
            <Card bg={cardBg}>
              <CardHeader>
                <Heading size="md">💨 Windiest</Heading>
              </CardHeader>
              <CardBody>
                <Text fontSize="xl">{stats.windiest}</Text>
              </CardBody>
            </Card>
          </SimpleGrid>
        )}

        <Card bg={cardBg}>
          <CardHeader>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Box>
                <Text mb={2}>Chart Type</Text>
                <Select 
                  value={chartType} 
                  onChange={(e) => setChartType(e.target.value)}
                >
                  <option value="line">Line Chart</option>
                  <option value="bar">Bar Chart</option>
                  <option value="pie">Pie Chart</option>
                </Select>
              </Box>
              <Box>
                <Text mb={2}>City</Text>
                <Select 
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="all">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </Select>
              </Box>
              <Box>
                <Text mb={2}>Time Range</Text>
                <Select 
                  value={timeRange} 
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <option value="weekly">Weekly</option>
                  <option value="all">All Data</option>
                </Select>
              </Box>
            </Stack>
          </CardHeader>
          <CardBody>
            {chartData.length > 0 ? (
              renderChart()
            ) : (
              <Text>No data available for the selected filters</Text>
            )}
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default WeatherCharts;