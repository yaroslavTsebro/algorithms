## Hashing Process

1. **Padding**: Pad the original message to a length that is a multiple of the block size. Padding includes a '1' bit followed by zeros and then the length of the original message.

2. **Splitting into Blocks**: The padded message is divided into fixed-length blocks.

3. **Initialization**: The initial hash value (IV) is set.

4. **Compression Function Iteration**: Each block of data is sequentially processed with the compression function together with the current hash value:
   \[
   H_i = f(H_{i-1}, M_i)
   \]
   where \( H_i \) is the current hash, \( H_{i-1} \) is the previous hash, and \( M_i \) is the current data block.

5. **Finalization**: After processing all blocks, the result of the last application of the compression function is the final hash.
