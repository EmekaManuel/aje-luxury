import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Flex, Box, Text, Icon } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";
import SearchFilter from "@/components/SearchFilter";
import Property from "@/components/Property";
import NoResult from '../assets/image/noResult.svg'
import { dataFetching, baseUrl } from "@/utils/dataFetching";

 
const search = ({properties}) => {
  const [searchFilter, setSearchFilters] = useState(false);
  const router = useRouter();

  return (
    <Box>
      <Flex
        cursor="pointer"
        bg="gray.200"
        borderBottom="1px"
        borderColor="gray.200"
        p="2"
        fontWeight="medium"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
        onClick={() => setSearchFilters((prevFilter) => !prevFilter)}
      >
        <Text>Search Property By Filters </Text>
        <Icon paddingLeft="2" w="7" as={BsFilter} />
      </Flex>

        {
            searchFilter && <SearchFilter/>
        }

        <Text fontSize='2xl'p='4' fontWeight='bold'>Properties {router.query.purpose} </Text>
        <Flex flexWrap='wrap'>
            {
                properties.map((property) => <Property property={property} key={property.id} />)
            }
        </Flex>
        {
            properties.length === 0 && (
                <Flex justifyContent='center' alignItems='center' flexDirection='column' mx='5' >
                    <Image alt="no-result" src={NoResult}/>
                    <Text fontSize='2xl' marginTop='3' >No Result Found</Text>
                </Flex>
            )
        }

    </Box>
  );
};

export default search;

export async function getServerSideProps({ query }) {
    const purpose = query.purpose || 'for-rent';
    const rentFrequency = query.rentFrequency || 'monthly';
    const minPrice = query.minPrice || '0';
    const maxPrice = query.maxPrice || '1000000';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDs || '5002';
    const categoryExternalID = query.categoryExternalID || '4';
  
    const data = await dataFetching(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);

    return {
        props: {
            properties: data?.hits
        }
    }
}  

