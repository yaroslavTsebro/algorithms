s1. **Padding**: The input message is padded to ensure its length is a multiple of 512 bits by appending a single '1' bit, followed by a series of '0' bits, and finally the length of the original message in bits.

2. **Initialization**: Four 32-bit registers (A, B, C, D) are initialized with fixed hexadecimal values.

3. **Processing**: The padded message is divided into 512-bit blocks, each processed through four rounds of logical functions, bitwise operations, and modular additions using specific constants.

4. **Finalization**: The final values of the registers A, B, C, and D are concatenated and converted into a 128-bit hash value, producing a unique 32-character hexadecimal number.