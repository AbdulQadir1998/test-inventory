## Approach and Thought Process
The primary goal is to match products from various vendors based on partial name similarities, 
even when their names differ significantly. To achieve this, I implemented a token-based comparison 
and used the Levenshtein distance to compute the similarity between product names.

### Normalization: 
  Product names are first normalized by converting them to lowercase and 
  removing special characters. The names are then split into tokens (words), 
  ensuring that even names with different word orders 
  (e.g., “Apple iPhone 13” vs. “iPhone 13 Apple”) are treated similarly.

### Token Comparison: 
  Using Levenshtein distance, the algorithm compares individual tokens 
  between product names. If tokens are similar (within a defined distance), 
  they are considered a match. This handles minor spelling variations and 
  differing formats (e.g., "13" and "XIII").

### Grouping: 
  The algorithm groups products based on token similarities. 
  If two products share a significant portion of tokens, they are grouped together.

