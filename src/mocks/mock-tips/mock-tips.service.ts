import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class MockTipsService {
  private readonly mockTips = [
    {
      _id: {
        $oid: "668dca054888f5e5c58db0a4"
      },
      id: 3,
      img_url: "https://www.bing.com/images/search?view=detailV2&ccid=D%2fWr8C63&id=A8FFB0D382E134CFF5F2F2F67A1EC93D6F13E46F&thid=OIP.D_Wr8C63zi11nrTEkDZx4QHaE8&mediaurl=https%3a%2f%2fneilpatel.com%2fwp-content%2fuploads%2f2017%2f12%2fo-que-e-codigo-html.jpeg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.0ff5abf02eb7ce2d759eb4c4903671e1%3frik%3db%252bQTbz3JHnr28g%26pid%3dImgRaw%26r%3d0&exph=667&expw=1000&q=img+codigo&simid=608036197300382741&FORM=IRPRST&ck=3ADBFAE4B2F87CE3D91FC195D0D4D2C3&selectedIndex=17&itb=0",
      title: "Use Async await",
      body: "Always use 'use strict' at the beginning of your JavaScript files.",
      link: "https://example.com/strict-mode",
      available: true,
      seniority: [
        {
          _id: {
            $oid: "66845a35688ba50c93cf8bfb"
          },
          name: "Junior",
        }
      ],
      technology: [
        {
          _id: {
            $oid: "66854d83d09bd33eb9536dfd"
          },
          name: "JavaScript"
        }
      ],
      subtechnology: [
        {
          _id: {
            $oid: "668551248d9d19ed6e5b5cde"
          },
          name: "React.js"
        }
      ],
      lang: [
        {
          _id: {
            $oid: "668c05da0181b9510f9eba09"
          },
          name: "portugues"
        }
      ],
      createdAt: {
        $date: "2024-07-09T23:38:45.884Z"
      },
      createBy: "admin",
      updatedAt: {
        $date: "2024-07-09T23:38:45.884Z"
      },
      deletedAt: null,
      __v: 0
    },
    {
      _id: {
        $oid: "668dca054888f5e5c58db0a5"
      },
      id: 4,
      img_url: "https://example.com/images/tip4.jpg",
      title: "Use const and let",
      body: "Always prefer 'const' and 'let' over 'var' to declare variables.",
      link: "https://example.com/const-let",
      available: true,
      seniority: [
        {
          _id: {
            $oid: "66845a35688ba50c93cf8bfc"
          },
          name: "Mid-level",
        }
      ],
      technology: [
        {
          _id: {
            $oid: "66854d83d09bd33eb9536dfe"
          },
          name: "JavaScript"
        }
      ],
      subtechnology: [
        {
          _id: {
            $oid: "668551248d9d19ed6e5b5cdf"
          },
          name: "Node.js"
        }
      ],
      lang: [
        {
          _id: {
            $oid: "668c05da0181b9510f9eba0a"
          },
          name: "english"
        }
      ],
      createdAt: {
        $date: "2024-07-09T23:38:45.884Z"
      },
      createBy: "admin",
      updatedAt: {
        $date: "2024-07-09T23:38:45.884Z"
      },
      deletedAt: null,
      __v: 0
    },
    {
      _id: {
        $oid: "668dca054888f5e5c58db0a6"
      },
      id: 5,
      img_url: "https://example.com/images/tip5.jpg",
      title: "Use Arrow Functions",
      body: "Arrow functions provide a concise syntax for writing functions.",
      link: "https://example.com/arrow-functions",
      available: true,
      seniority: [
        {
          _id: {
            $oid: "66845a35688ba50c93cf8bfd"
          },
          name: "Senior",
        }
      ],
      technology: [
        {
          _id: {
            $oid: "66854d83d09bd33eb9536dff"
          },
          name: "JavaScript"
        }
      ],
      subtechnology: [
        {
          _id: {
            $oid: "668551248d9d19ed6e5b5ce0"
          },
          name: "Vue.js"
        }
      ],
      lang: [
        {
          _id: {
            $oid: "668c05da0181b9510f9eba0b"
          },
          name: "spanish"
        }
      ],
      createdAt: {
        $date: "2024-07-09T23:38:45.884Z"
      },
      createBy: "admin",
      updatedAt: {
        $date: "2024-07-09T23:38:45.884Z"
      },
      deletedAt: null,
      __v: 0
    },

    {
      _id: {
        $oid: "668dca054888f5e5c58db0a7"
      },
      id: 6,
      img_url: "https://example.com/images/tip6.jpg",
      title: "Use Template Literals",
      body: "Template literals provide an easy way to interpolate variables and expressions into strings.",
      link: "https://example.com/template-literals",
      available: true,
      seniority: [
        {
          _id: {
            $oid: "66845a35688ba50c93cf8bfe"
          },
          name: "Junior",
        }
      ],
      technology: [
        {
          _id: {
            $oid: "66854d83d09bd33eb9536e00"
          },
          name: "JavaScript"
        }
      ],
      subtechnology: [
        {
          _id: {
            $oid: "668551248d9d19ed6e5b5ce1"
          },
          name: "Nest.js"
        }
      ],
      lang: [
        {
          _id: {
            $oid: "668c05da0181b9510f9eba0c"
          },
          name: "english"
        }
      ],
      createdAt: {
        $date: "2024-07-09T23:38:45.884Z"
      },
      createBy: "admin",
      updatedAt: {
        $date: "2024-07-09T23:38:45.884Z"
      },
      deletedAt: null,
      __v: 0
    },
  ];

  async getTips(seniority: string, technology: string): Promise<any> {
    const tips = this.mockTips.filter(tip =>
      tip.seniority.some(s => s.name === seniority) &&
      tip.technology.some(t => t.name === technology)
    );

    if (tips.length === 0) {
      throw new NotFoundException(`No tips found for seniority '${seniority}' and technology '${technology}'`);
    }

    // Obtener un índice aleatorio
    const randomIndex = Math.floor(Math.random() * tips.length);
    // Seleccionar el tip aleatorio
    const randomTip = tips[randomIndex];

    return randomTip;
  }
}




