import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  font-family: 'coder';
  padding: 10px;
  font-size: 24px;
  border-radius: 6px;
  border: none;
  background-color: black;
  padding: 10px;
  letter-spacing: 6px;
  // font-weight: bold;
  color: #FFD42F;
  width: 450px;
  height: 50px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
  :hover {
    background-color: #1c75ed;
  }
  @media (max-width: 565px) {
    width: 350px;
    font-size: 18px;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  border: none;
  background-color: black;
  padding: 10px;
  // font-weight: bold;
  font-size: 50px;
  color: #FFD42F;
  width: 60px;
  height: 60px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
  :hover {
    background-color: #1c75ed;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  // margin: auto;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const ResponsiveWrapperHeader = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledLogo = styled.img`
  display: inline;
  width: 100px;
  height: 100px;
  @media (max-width: 767px) {
    width: 50px;
    height: 50px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
  width: 300px;
  @media (min-width: 900px) {
    width: 300px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  transition: width 0.5s;
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;

export const WalletBox = styled.div`
  text-decoration: none;
  border-radius: 10px;
  border: 2px solid white;
  background-color: black;
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  width: 250px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [walletAddress, setAddress] = useState("Not Connected");
  const [claimingNft, setClaimingNft] = useState(false);
  const [BurnNft, setBurnNft] = useState(false);
  const [feedback, setFeedback] = useState(`NFTb Minting Dapp`);
  const [tokens, settokens] = useState(10);
  const [tokenID, settokenID] = useState();
  const [ipfs, setipfs] = useState("ipfs://");
  const ipfsInputRef = useRef();
  const tokensInputRef = useRef();
  const tokenIDInputRef = useRef();
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    WL_COST: 0,
    DISPLAY_COST: 0,
    WL_Display: 0,
    GAS_LIMIT: 0,
    WEB_LINK: "",
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    Solart:"",
    SHOW_BACKGROUND: false,
  });


  const claimNFTs = () => {
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalGasLimit = String(gasLimit);
    console.log("Gas limit: ", totalGasLimit);
    console.log(ipfs);
    setFeedback(`Minting your NFT...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(blockchain.account, [blockchain.account], [tokens], ipfs)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback('Sorry, something went wrong please try again later.');
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `go visit ${Solart} to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const BurnNFTS = () => {
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalGasLimit = String(gasLimit);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Burning NFT #${tokenID}...`);
    setBurnNft(true);
    blockchain.smartContract.methods
      .burn(blockchain.account)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback(`Sorry, something went wrong please try again later.`);
        setBurnNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `NFT #${tokenID} Burned.`
        );
        setBurnNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };


  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
      setAddress(blockchain.account.substring(0,4) + "..." + blockchain.account.substring(38,42));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <s.Screen>
      <s.Container
        flex={1}
        // ai={"center"}
        style={{ padding: 24, backgroundColor: "var(--primary)" }}
        image={CONFIG.SHOW_BACKGROUND ? "/config/images/bg.png" : null}
      >
  

        <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
            <s.Container flex={1} jc={"center"} ai={"center"} >
            <s.StyledHR></s.StyledHR>
            <s.SpacerSmall />


                <s.TextSub 
                  style={{ textAlign: "center", color: "var(--accent-text)", fontFamily: "coder"  }}
                >
                  Solart NFTb Mint Dapp

                </s.TextSub>
                <s.SpacerSmall />
                <s.StyledHR></s.StyledHR>
                <s.SpacerXSmall />
                <s.SpacerLarge />
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
    
                    <s.SpacerSmall />
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      CONNECT METAMASK
                      <img style={{width: 30, paddingRight: 10 }} src={"/config/images/mm.svg"} />
                    </StyledButton>

                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                            fontFamily: "coder",
                          }}
                        >
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                  <>
                    <s.Container ai={"center"} jc={"center"} fd={"column"}>
                    <s.SpacerSmall />
                      <s.TextSubTitle>
                        {feedback}
                      </s.TextSubTitle>
                    <input style={{ width: 300, height: 50}}
                          onChange={ e => setipfs(e.target.value)}
                          value={ipfs}
                          placeholder="ipfs link"
                          type="text"
                          min="ipfs"
                          max=""
                          ref={ipfsInputRef}
                        /> 
                        <s.SpacerSmall/>
                          <input style={{ width: 150, height: 25}}
                          onChange={ e => settokens(e.target.value)}
                          value={tokens}
                          placeholder="Royalties"
                          type="number"
                          min="1"
                          max="10"
                          ref={tokensInputRef}
                        /> 
                    </s.Container>
                    <s.SpacerSmall />
                    <s.StyledHR ></s.StyledHR>
                    <s.SpacerSmall />
                    <s.Container ai={"center"} jc={"center"} fd={"column"}>
                      <s.SpacerSmall/>
                         <StyledButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          claimNFTs();
                          getData();
                        }}
                      >
                        {claimingNft ? "MINTING..." : "MINT To NFTb"}
                      </StyledButton>
                    </s.Container>
                    <s.SpacerSmall/>
                    <s.Container ai={"center"} jc={"center"} fd={"column"}>
                      <s.SpacerSmall/>
                         <StyledButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          BurnNFTS();
                          getData();
                        }}
                        style={{backgroundColor: "red", color: "white"}}
                      >
                        {BurnNft ? "Burning..." : "BURN NFT"}
                      </StyledButton>
                      <s.SpacerSmall/>
                          <input style={{ width: 150, height: 25}}
                          onChange={ e => settokenID(e.target.value)}
                          value={tokenID}
                          placeholder="Tokenid to burn"
                          type="number"
                          min="1"
                          max="99999999"
                          ref={tokenIDInputRef}
                        /> 
                    </s.Container>
                  </>
                )}
            <s.SpacerMedium />
            
            </s.Container>
          <s.SpacerLarge />

        </ResponsiveWrapper>
        <s.SpacerMedium />
      </s.Container>
    </s.Screen>
  );
}

export default App;
