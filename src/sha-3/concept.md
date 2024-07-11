### SHA-3
It is based on the Keccak algorithm and utilizes the sponge construction.

1. **Initialization**:
   - The initial sponge state is set to zeros.

2. **Padding**:
   - The input message is padded to a length that is a multiple of the block size.

3. **Absorption**:
   - The message is divided into blocks, and each block is XOR-ed with the sponge state sequentially.
   - After processing each block, the state is updated using the Keccak round function.

4. **Keccak Round Function**:
   - Consists of five steps: θ (theta), ρ (rho), π (pi), χ (chi), ι (iota).
   - These steps ensure mixing and diffusion of the bits within the state.

5. **Squeezing**:
   - After processing all the blocks, the squeezing phase begins, where the output hash bits are extracted.
   - The final hash value is formed from the sponge state.

6. **Output**:
   - The obtained hash value is output in the specified format.