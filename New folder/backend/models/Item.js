import { Schema, model } from 'mongoose';
const ortSchema = new Schema(
  {
    city: {
      type: String
    },
    country: {
      type: String,
      default: 'Deutschland'
    }
  },

  { _id: false }
);
const colorSchema = new Schema(
  {
    colorcode: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },

  { _id: false }
);

const ItemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 25
    },
    description: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 500
    },
    category: {
      type: String,
      enum: ['Kinder', 'Damen', 'Herren'],
      required: true
    },
    subcategory: {
      type: String,
      enum: [
        'Shirts & Tops',
        'Pullover',
        'Hosen & Jeans',
        'Shorts',
        'Kleider & Röcke',
        'Jacken & Mäntel',
        'Nachtwäsche',
        'Bademode',
        'Anzüge & Blazer',
        'Kleiderpakete',
        'Bodies & Strampler'
      ],
      required: true
    },
    images: [
      {
        type: String,
        required: true
      }
    ],
    ort: ortSchema,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    chatsId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'chat'
      }
    ],
    status: {
      type: String,
      enum: ['aktiv', 'reserviert', 'verschenkt'],
      default: 'aktiv'
    },
    size: {
      type: String,
      required: true
    },
    color: [colorSchema],
    shipping: {
      type: String,
      required: true,
      enum: ['Nur Abholung', 'Versand möglich'],
      default: 'Versand möglich'
    }
  },
  { timestamps: true }
);
export const Item = model('item', ItemSchema);
