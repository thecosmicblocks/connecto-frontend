import gql from 'graphql-tag';

export const getTokensQuery = gql`query getTokens($limit: Int, $offset: Int, $where: TokenWhereParams = {}, $orderBy: TokenOrderByParams = {}, $attributesFilter: [AttributeFilterValue!]) {
  tokens(
    where: $where
    limit: $limit
    offset: $offset
    order_by: $orderBy
    attributes_filter: $attributesFilter
  ) {
    data {
      collection_id
      token_id
      tokens_owner
      burned
    }
    count
    timestamp
    __typename
  }
}`