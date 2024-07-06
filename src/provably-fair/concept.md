### 1. The client generates/records their seed (client seed) and sends it to the server:

- The client creates their unique seed, which will be used in the process of generating random numbers.

### 2. The server generates its seed (server seed) and sends the hashed value to the client:

- The server generates a random value (server seed) and hashes it using a cryptographic hash function (e.g., SHA-256).
- The server sends the hashed value to the client so that the client knows the server cannot change this value after the game starts.

### 3. Generating the final hash for value generation:

- Based on the client seed and server seed, the final seed is generated.
- It's important to consider the nonce (a one-time number) so that each result is unique, even if the same seeds are used.
- The final hash is used to generate random numbers or other game data.

### 4. When the session ends, the server gives the unhashed seed to the client:

- After the game ends, the server reveals the original server seed to the client.
- The client can hash this value themselves and compare it with the previously received hash to ensure that the server did not change the value.