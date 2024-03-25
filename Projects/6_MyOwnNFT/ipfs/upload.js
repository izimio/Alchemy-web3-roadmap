async function run() {
    const { create } = await import('ipfs-http-client');
    const ipfs = create()
    
    // we added three attributes, add as many as you want!
    const metadata = {
        path: '/',
        content: JSON.stringify({
            name: "My First NFT",
            attributes: [
            {
                "trait_type": "Epitech",
                "value": "10" 
            },
            {
                "trait_type": "iExec",
                "value": "100"
            },
            {
                "trait_type": "Anaïs",
                "value": "1000"
            },
            {
                "trait_type": "Brionne",
                "value": "69610"
            }
            ],
            // update the IPFS CID to be your image CID
            image: "ipfs://QmWR7nXezgnL2S2njZvjsQytcheBktUr3mMP6GnegQvhAr",
            description: "Brionne NFT!",
        })
    };

    const result = await ipfs.add(metadata);
    console.log(result);

    process.exit(0);
}

run();