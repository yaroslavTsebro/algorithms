# Concept of Argon2 Algorithm

Argon2 is a cryptographic hashing algorithm designed specifically for password hashing. It was the winner of the Password Hashing Competition (PHC) in 2015 and is recognized for its high security and efficiency. Argon2 is highly configurable, allowing users to balance between memory usage, execution time, and parallelism.

## Key Characteristics

- **Security**: Provides resistance against brute-force attacks, side-channel attacks, and GPU cracking attempts.
- **Configurability**: Allows tuning of memory cost, time cost, and degree of parallelism to achieve desired security and performance levels.
- **Variants**: Comes in three main variants - Argon2d, Argon2i, and Argon2id.

## Variants

- **Argon2d**: Optimized for maximum resistance against GPU cracking attacks, uses data-depending memory access.
- **Argon2i**: Optimized for resistance against side-channel attacks, uses data-independent memory access.
- **Argon2id**: Hybrid version that provides a balance between Argon2d and Argon2i, offering resistance to both GPU and side-channel attacks.

## Main Steps

1. **Initialization**: The algorithm starts by initializing the internal state with the input parameters such as password, salt, memory cost, time cost, and degree of parallelism.

2. **Memory Filling**: Memory blocks are filled based on a specific scheme, either data-dependent (Argon2d) or data-independent (Argon2i).

3. **Mixing Phase**: Blocks of memory are iteratively processed and mixed to produce a high level of diffusion. This phase is controlled by the time cost parameter, which defines the number of iterations.

4. **Finalization**: After the mixing phase, the final block is used to generate the output hash.
