1. **Padding**: The input message is padded to ensure its length is a multiple of 512 bits. Padding involves appending a single '1' bit, followed by a series of '0' bits, and finally, the length of the original message in bits, represented as a 64-bit big-endian integer.

2. **Initialization**: Eight 32-bit registers (A, B, C, D, E, F, G, H) are initialized with specific fixed hexadecimal values.

3. **Processing**: The padded message is divided into 512-bit blocks. Each block is processed through 64 rounds of various operations involving logical functions, bitwise operations, modular additions, and specific constants. The steps are as follows:

    - **Message Schedule**: A 64-entry message schedule array is created. The first 16 entries are the 32-bit words from the current 512-bit block. The remaining 48 entries are generated using a series of bitwise operations and additions on the previous entries.
    
    - **Compression Function**: The eight registers (A, B, C, D, E, F, G, H) are updated for each of the 64 rounds. In each round, specific logical functions, constants, and values from the message schedule array are used to perform the operations.
    
    - **Register Update**: After processing each block, the values of the registers are updated by adding the initial values to the current values of the registers.

4. **Finalization**: After all blocks have been processed, the final values of the registers A, B, C, D, E, F, G, and H are concatenated to produce a 256-bit hash value, resulting in a unique 64-character hexadecimal number.