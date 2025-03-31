# ByteGaze

**Ethereum ABI Data Visualizer**

ByteGaze is a tool for visualizing Ethereum ABI-encoded data and method call payloads. It helps developers debug smart contract interactions by automatically detecting 4-byte function selectors and splitting the remaining data into 32-byte chunks for easier analysis. It can also be used for decoding ABI data without selectors.

![ByteGaze Screenshot](https://bytegaze.vercel.app/screenshot.jpg)

## Features

- Clean visualization of EVM words (32-byte chunks)
- Automatic detection of function selectors
- One-click copying of selectors and individual chunks
- Dark mode support
- Responsive design for all devices
- Clear error messages for invalid inputs

## Usage

Check out the [ByteGaze website](https://bytegaze.vercel.app) to start using the tool.

1. Paste your Ethereum transaction data or method call payload
2. ByteGaze automatically parses the input and displays:
    - The function selector (if present)
    - Data chunks in 32-byte segments
3. Click on any selector or chunk to copy it to your clipboard

## Development

### Install dependencies

```sh
bun install
```

### Run development server

```sh
bun dev
```

### Build for production

```sh
bun run build
```

### Check code with Biome

```sh
bun run check
```

### Fix code with Biome

```sh
bun run fix
```

### Format code with Biome

```sh
bun run format
```

## License

This project is licensed under MIT.
