-- ============================================================
-- OmniOffice — Public read access for shared canvas links
-- Anyone with the link can view; only the owner can write.
-- ============================================================

-- Permissive policies are OR-ed: this unlocks SELECT for all
-- while the existing "owner_all" policy still gates INSERT/UPDATE/DELETE.
CREATE POLICY "public_read" ON omnioffice_documents
  FOR SELECT
  USING (true);
