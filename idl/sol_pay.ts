export type SolPay = {
  "version": "0.1.0",
  "name": "sol_pay",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "receiver",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "receiverTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeLamports",
      "accounts": [
        {
          "name": "receiver",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "transfer",
      "accounts": [
        {
          "name": "sender",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "receiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiverTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "senderTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "availAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "transferLamports",
      "accounts": [
        {
          "name": "sender",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "getter",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "receiver",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "availAmount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "receiverDetails",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "tokenAccount",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "receiverLamportDetails",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "receiverPubkey",
            "type": "publicKey"
          }
        ]
      }
    }
  ]
};

export const IDL: SolPay = {
  "version": "0.1.0",
  "name": "sol_pay",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "receiver",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "receiverTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeLamports",
      "accounts": [
        {
          "name": "receiver",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "transfer",
      "accounts": [
        {
          "name": "sender",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "receiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiverTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "senderTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "availAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "transferLamports",
      "accounts": [
        {
          "name": "sender",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "getter",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "receiver",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "availAmount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "receiverDetails",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "tokenAccount",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "receiverLamportDetails",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "receiverPubkey",
            "type": "publicKey"
          }
        ]
      }
    }
  ]
};
