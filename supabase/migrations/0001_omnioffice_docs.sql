-- ============================================================
-- OmniOffice — Documents table
-- Stores canvas documents: body text + placed objects
-- ============================================================

CREATE TABLE IF NOT EXISTS omnioffice_documents (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title      TEXT NOT NULL DEFAULT 'Untitled Canvas',
  body_text  TEXT NOT NULL DEFAULT '',
  objects    JSONB NOT NULL DEFAULT '[]',
  owner_id   UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS: users can only see/edit their own documents
ALTER TABLE omnioffice_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "owner_all" ON omnioffice_documents
  FOR ALL
  USING  (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION omnioffice_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER omnioffice_documents_updated_at
  BEFORE UPDATE ON omnioffice_documents
  FOR EACH ROW EXECUTE FUNCTION omnioffice_set_updated_at();
