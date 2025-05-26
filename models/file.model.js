import mongoose from 'mongoose'

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['file', 'folder'], required: true },
  path: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  size: { type: Number, default: 0 },
  mimeType: { type: String },

  //  Partage à des utilisateurs spécifiques
  sharedWith: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    permission: { type: String, enum: ['read', 'write', 'download'], default: 'read' }
  }],

  //  Partage public
  publicLink: { type: String },
  isPublic: { type: Boolean, default: false }

}, { timestamps: true })

export default mongoose.model('File', fileSchema)
