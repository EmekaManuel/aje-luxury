import Link from 'next/link';
// import Image from 'next/image';
import { Img } from '@chakra-ui/react';
import { Flex, Box, Text, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import Property from '../components/Property';
import { baseUrl, dataFetching } from '../utils/dataFetching';

export const Banner = ({ purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl }) => (
  <Flex flexWrap='wrap' justifyContent='center' alignItems='center' m='10'>
    <Img src={imageUrl} width={500} height={300} />
    <Box p='5'>
      <Text color='gray.500' fontSize='sm' fontWeight='medium'>{purpose}</Text>
      <Text fontSize='3xl' fontWeight='bold'>{title1}<br />{title2}</Text>
      <Text fontSize='lg' paddingTop='3' paddingBottom='3' color='gray.700'>{desc1}<br />{desc2}</Text>
      <Button fontSize='sm' fontFamily={'sans-serif'} bg="blue.600" color="white">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
);

// logic for random images on page load 
const randomBackground1 = () => {
  const images = [
    "https://bayut-production.s3.eu-central-1.amazonaws.com/image/311192786/876ac4487bda43fab63ae973761e1a41",
    "https://bayut-production.s3.eu-central-1.amazonaws.com/image/198256719/026fc4b608df413ab7d6fe8842c858f5",
    "https://bayut-production.s3.eu-central-1.amazonaws.com/image/352929666/24cd341a22a74eeeb5f12f4fb1b81816",
    "https://bayut-production.s3.eu-central-1.amazonaws.com/image/356144328/77e8f25b71fe4f7fa67ea9e08eab89ce",
    "https://bayut-production.s3.eu-central-1.amazonaws.com/image/287162437/2b28162260de4fd8a565562c7a2a0480",
  ];
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};
const randomBackground2 = () => {
  const images = [
    "https://bayut-production.s3.eu-central-1.amazonaws.com/image/293996356/b1cad13c509245fd96f86315d0c3a347",
    "https://bayut-production.s3.eu-central-1.amazonaws.com/image/237825181/1441fe19ffef4c8e9aad03b2638e0e77",
    "https://bayut-production.s3.eu-central-1.amazonaws.com/image/239794347/3c5dfbc571ce49e694183fd610cb677b",
    "https://bayut-production.s3.eu-central-1.amazonaws.com/image/284471016/4fe3352c3b31445cbdbc1d395bc55568",
    "https://bayut-production.s3.eu-central-1.amazonaws.com/image/351462274/8af48d0d8a3f46fa8bcf0925dc50c5c9",
  ];
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

//end of logic for random images on page load 

const Home = ({ propertiesForSale, propertiesForRent }) => {
  
  //useEffect for random background image on load 
  const [backgroundImage, setBackgroundImage] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundImage(randomBackground1());
    },3000);
    return () => clearInterval(interval)
  }, []);

  const [backgroundImage2, setBackgroundImage2] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundImage2(randomBackground2());
    },3000);
    return () => clearInterval(interval)  }, []);
  //useEffect for random background image on load 

  return (

    <Box>
    <Banner
      purpose='RENT ANYTHING'
      title1='Rental Luxury for'
      title2='Everyone'
      desc1=' Explore from Apartments, Cars, Villas '
      desc2='and more'
      buttonText='Explore Renting'
      linkName='/search?purpose=for-rent'
      imageUrl={backgroundImage}
      />
    <Flex flexWrap='wrap'>
      {propertiesForRent.map((property) => <Property property={property} key={property.id} />)}
    </Flex>
    <Banner
      purpose='BUY A HOME'
      title1=' Find, Buy & Own Your'
      title2='Dream Home'
      desc1=' Explore from Apartments, land, builder floors,'
      desc2=' villas and more'
      buttonText='Explore Buying'
      linkName='/search?purpose=for-sale'
      imageUrl={backgroundImage2}
/>
    <Flex flexWrap='wrap'>
      {propertiesForSale.map((property) => <Property property={property} key={property.id} />)}
    </Flex>
  </Box>
)
}
;

export async function getStaticProps() {
  const propertyForSale = await dataFetching(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent = await dataFetching(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);
  
  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}

export default Home;