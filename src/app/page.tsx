"use client";

import { useState, useEffect, useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeContext } from './ThemeContext';
import ThemeToggle from './ThemeToggle';
import { Check, Copy } from 'lucide-react';
import ClientLayout from './ClientLayout';
import {
  PageWrapper, Container, Main, Header, Title, Subtitle, Description,
  Input, ErrorBox, ChunkContainer, SelectorCard, ChunkCard, EmptyMessage,
  FlexRow, LabelSpan, ValueContainer, SelectorValue, ChunkValue, CopyIconWrapper,
  Footer, FooterContent, FooterLink, LinkContainer
} from './StyledComponents';

export default function Home() {
  const [input, setInput] = useState<string>('0x0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000023ffec2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000');
  const [processedInput, setProcessedInput] = useState<string>('');
  const [functionSelector, setFunctionSelector] = useState<string | null>(null);
  const [chunks, setChunks] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { currentTheme } = useContext(ThemeContext);

  // Set mounted to true once component mounts on client and initialize with example data
  useEffect(() => {
    setMounted(true);
    // Set the initial processed input to match the default value
    setProcessedInput(input);
  }, []);

  useEffect(() => {
    if (!processedInput) {
      setChunks([]);
      setFunctionSelector(null);
      setError(null);
      return;
    }

    // Remove 0x prefix if present
    const hasPrefix = processedInput.startsWith('0x');
    const cleaned = hasPrefix ? processedInput.substring(2) : processedInput;

    // Check if we have at least 4 bytes (8 hex chars) for a function selector
    if (cleaned.length >= 8) {
      // Extract potential function selector
      const potentialSelector = cleaned.substring(0, 8);
      // Rest of the data after selector
      const restOfData = cleaned.substring(8);

      // Check if the rest of data's length is a multiple of 64 (32 bytes)
      if (restOfData.length % 64 === 0 || restOfData.length === 0) {
        // Valid function selector case
        setFunctionSelector(potentialSelector);

        // Split the rest into 64-character chunks (32-byte words)
        const newChunks = [];
        for (let i = 0; i < restOfData.length; i += 64) {
          newChunks.push(restOfData.substring(i, i + 64));
        }
        setChunks(newChunks);
        setError(null);
      } else {
        // No valid function selector, check if entire cleaned input is valid
        if (cleaned.length % 64 === 0) {
          // Valid without function selector
          setFunctionSelector(null);
          // Split into 64-character chunks
          const newChunks = [];
          for (let i = 0; i < cleaned.length; i += 64) {
            newChunks.push(cleaned.substring(i, i + 64));
          }
          setChunks(newChunks);
          setError(null);
        } else {
          // Invalid format
          setFunctionSelector(null);
          setChunks([]);
          setError(`Input length after 0x prefix must be either:
                   1) 4 bytes (8 hex chars) for just a function selector, or
                   2) 4 bytes + multiple of 32 bytes (64 hex chars) for selector + parameters, or
                   3) multiple of 32 bytes for raw EVM words.
                   Current length: ${cleaned.length} characters`);
        }
      }
    } else if (cleaned.length === 0 && hasPrefix) {
      // Just 0x prefix
      setFunctionSelector(null);
      setChunks([]);
      setError(null);
    } else if (cleaned.length > 0 && cleaned.length < 8) {
      // Too short for a function selector
      setFunctionSelector(null);
      setChunks([]);
      setError(`Input too short. Ethereum calldata should be at least 4 bytes (8 hex chars) for a function selector.`);
    } else if (cleaned.length % 64 === 0) {
      // Valid raw EVM words without function selector
      setFunctionSelector(null);
      // Split into 64-character chunks
      const newChunks = [];
      for (let i = 0; i < cleaned.length; i += 64) {
        newChunks.push(cleaned.substring(i, i + 64));
      }
      setChunks(newChunks);
      setError(null);
    } else {
      // Invalid format
      setFunctionSelector(null);
      setChunks([]);
      setError(`Input length must be a multiple of 64 characters (32 bytes) for raw EVM words. Current length: ${cleaned.length}`);
    }
  }, [processedInput]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.trim();
    setInput(newValue);
    setProcessedInput(newValue); // Update processed input immediately when input changes
  };

  // Return a static version before client-side hydration
  if (!mounted) {
    return (
      <ClientLayout>
        <PageWrapper>
          <Main>
            <Container>
              <Header>
                <Title>ByteGaze</Title>
                <Subtitle>Ethereum ABI Data Visualizer</Subtitle>
              </Header>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>Loading...</div>
            </Container>
          </Main>
          <Footer>
            <Container>
              <FooterContent>
                <div>Created by Paul Berg</div>
                <FooterLink href="https://github.com/PaulRBerg/bytegaze" target="_blank" rel="noopener noreferrer">
                  GitHub
                </FooterLink>
              </FooterContent>
            </Container>
          </Footer>
        </PageWrapper>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <PageWrapper>
        <Container style={{ position: 'relative', paddingTop: '1rem' }}>
          <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}>
            <ThemeToggle />
          </div>
        </Container>

        <Main>
          <Container>
            <Header>
              <Title>ByteGaze</Title>
              <Subtitle>Ethereum ABI Data Visualizer</Subtitle>
              <Description>
                Paste any Ethereum transaction data or method call payload to analyze it. ByteGaze detects 4-byte function selectors
                and splits the rest into 32-byte chunks for easier analysis.
                Useful for debugging smart contract interactions and inspecting transaction data.
              </Description>
            </Header>

            <Input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Enter ABI-encoded data (0x...)"
            />

            {error && <ErrorBox>{error}</ErrorBox>}

            <ChunkContainer>
              <AnimatePresence>
                {/* Function Selector if present */}
                {functionSelector && (
                  <SelectorCard
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => {
                      navigator.clipboard.writeText(functionSelector);
                      setCopiedIndex(-1); // Special index for selector
                      setTimeout(() => {
                        setCopiedIndex(null);
                      }, 2000);
                    }}
                  >
                    <FlexRow>
                      <LabelSpan>Function Selector:</LabelSpan>
                      <ValueContainer>
                        <SelectorValue>{functionSelector}</SelectorValue>
                        <CopyIconWrapper>
                          {copiedIndex === -1 ? (
                            <Check size={18} />
                          ) : (
                            <Copy size={18} />
                          )}
                        </CopyIconWrapper>
                      </ValueContainer>
                    </FlexRow>
                  </SelectorCard>
                )}

                {/* 32-byte chunks */}
                {chunks.map((chunk, index) => (
                  <ChunkCard
                    key={`chunk-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => {
                      navigator.clipboard.writeText(chunk);
                      setCopiedIndex(index);
                      setTimeout(() => {
                        setCopiedIndex(null);
                      }, 2000);
                    }}
                  >
                    <FlexRow>
                      <LabelSpan>Chunk {index}:</LabelSpan>
                      <ValueContainer>
                        <ChunkValue>{chunk}</ChunkValue>
                        <CopyIconWrapper>
                          {copiedIndex === index ? (
                            <Check size={18} />
                          ) : (
                            <Copy size={18} />
                          )}
                        </CopyIconWrapper>
                      </ValueContainer>
                    </FlexRow>
                  </ChunkCard>
                ))}
              </AnimatePresence>

              {/* No data message */}
              {!error && functionSelector === null && chunks.length === 0 && processedInput && (
                <EmptyMessage>No valid Ethereum calldata to display</EmptyMessage>
              )}
            </ChunkContainer>
          </Container>
        </Main>

        <Footer>
          <Container>
            <FooterContent>
              <div>Created by Paul Berg</div>
              <LinkContainer>
                <FooterLink
                  href="https://docs.soliditylang.org/en/develop/abi-spec.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ABI Spec
                </FooterLink>
                <FooterLink
                  href="https://github.com/PaulRBerg/bytegaze"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source Code
                </FooterLink>
              </LinkContainer>
            </FooterContent>
          </Container>
        </Footer>
      </PageWrapper>
    </ClientLayout>
  );
}
