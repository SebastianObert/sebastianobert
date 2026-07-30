CREATE POLICY "Users can delete own inventory" ON public.user_inventory FOR DELETE USING (auth.uid() = user_id);
