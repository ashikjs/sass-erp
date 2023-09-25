import React from "react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag
} from "@choc-ui/chakra-autocomplete";


const AutoCompleteComponent = ({products, placeholder, onChangeProduct}: any) => {
  return (
    <AutoComplete openOnFocus multiple onChange={onChangeProduct}>
      <AutoCompleteInput variant="filled" placeholder={placeholder} value={''}>
        {
          ({tags}: { tags?: Array<any> }) =>
            tags?.map((tag: any, tId: number) => (
              <AutoCompleteTag
                key={tId}
                label={tag.label}
                onRemove={tag.onRemove}
              />
            ))
        }
      </AutoCompleteInput>
      <AutoCompleteList>
        {
          products && products.map((product: any, cid: number) => (
            <AutoCompleteItem
              key={`option-${cid}`}
              value={product._id}
              label={product.name}
              textTransform="capitalize"
              _selected={{bg: "whiteAlpha.50"}}
              _focus={{bg: "whiteAlpha.100"}}
            >
            </AutoCompleteItem>
          ))
        }
      </AutoCompleteList>
    </AutoComplete>
  );
};

export default AutoCompleteComponent;
