import React from "react";
import { useEffect, useState } from "react";
import { useRouter, router } from "next/router";
import {
  Flex,
  Select,
  Box,
  Text,
  Input,
  Spinner,
  Icon,
  Button,
} from "@chakra-ui/react";
import { Img } from "@chakra-ui/react";
import { filterData, getFilterValues } from "@/utils/filters";

const SearchFilter = () => {
  const [filters, setFilters] = useState(filterData);


  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const {query} = router;
    
    const values = getFilterValues(filterValues);

    values.forEach((item) => {
        if(item.value && filterValues ?. [item.name]) {

            query[item.name] = item.value
        }
    })

    router.push({pathname:path, query})
  };
  return (
    <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
      {filters.map((filter) => (
        <Box key={filter.queryName}>
          <Select
            onChange={(event) => searchProperties({ [filter.queryName]: event.target.value })}
            w="fit-content"
            p="2"
            placeholder={filter.placeholder}
          >
            {filter?.items?.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
    </Flex>
  );
};

export default SearchFilter;
